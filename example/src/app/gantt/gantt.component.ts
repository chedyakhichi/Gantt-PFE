import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import {
    GanttBarClickEvent,
    GanttBaselineItem,
    GanttDragEvent,
    GanttItem,
    GanttLineClickEvent,
    GanttLinkDragEvent,
    GanttPrintService,
    GanttSelectedEvent,
    GanttTableDragDroppedEvent,
    GanttTableDragEndedEvent,
    GanttTableDragEnterPredicateContext,
    GanttTableDragStartedEvent,
    GanttToolbarOptions,
    GanttView,
    GanttViewType,
    NgxGanttComponent
} from 'ngx-gantt';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { finalize, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { random, randomItems } from '../helper';

@Component({
    selector: 'app-gantt-example',
    templateUrl: './gantt.component.html',
    styleUrls: ['./gantt.scss'],
    providers: [GanttPrintService]
})
export class AppGanttExampleComponent implements OnInit, AfterViewInit {
    views = [
        {
            name: 'Heure',
            value: GanttViewType.hour
        },
        {
            name: 'jour',
            value: GanttViewType.day
        },
        {
            name: 'semaine',
            value: GanttViewType.week
        },
        {
            name: 'mois',
            value: GanttViewType.month
        },
        {
            name: 'saison',
            value: GanttViewType.quarter
        },
        {
            name: 'Année',
            value: GanttViewType.year
        }
    ];

    viewType: GanttViewType = GanttViewType.month;

    selectedViewType: GanttViewType = GanttViewType.month;

    isBaselineChecked = false;

    isShowToolbarChecked = true;

    loading = false;

    items: GanttItem[] = [
        // { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597, links: ['000003', '000004', '000000'],  },
        { id: '000001', title: ' ATELIER10-Debitage', start: 1728174000, end: 1728174000, links: ['000003'] },

        { id: '000003', title: 'ATELIER11-Centre d usinage ', start: 1728175000, end: 1728177000, links: ['000004'], itemDraggable: false },
        { id: '000004', title: 'ATELIER12-Couvre chant', start: 1728181000, end: 1728185000, links: ['000005'] },
        { id: '000005', title: 'ATELIER13-Assemblage', start: 1728191000, links: ['000008'], end: 1728195000, color: '#709dc1' },

        { id: '000008', title: 'ATELIER14-Peinture epoxy ', start: 1728174000, end: 1728174000, color: '#709dc1' },

        { id: '0000012', title: 'ATELIER15-Debitage metal', start: 1728174000, end: 1728174000, links: ['0000013'] },
        { id: '0000013', title: 'ATELIER16-Pliage', start: 1728174000, end: 1728174000, links: ['0000014'] },
        { id: '0000014', title: 'ATELIER17-Soudure', start: 1728174000, end: 1728174000 }
    ];

    toolbarOptions: GanttToolbarOptions = {
        viewTypes: [GanttViewType.day, GanttViewType.month, GanttViewType.year]
    };

    baselineItems: GanttBaselineItem[] = [];

    options = {
        viewType: GanttViewType.day
    };

    viewOptions = {
        dateFormat: {
            month: 'mois'
        }
    };

    @HostBinding('class.gantt-example-component') class = true;

    @ViewChild('gantt') ganttComponent: NgxGanttComponent;

    dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
        return true;
    };

    constructor(private printService: GanttPrintService, private thyNotify: ThyNotifyService) {}

    ngOnInit(): void {
        // init items children
        this.items.forEach((item, index) => {
            if (index % 5 === 0) {
                item.children = randomItems(random(1, 5), item);
            }
        });

        console.log(this.items);
    }

    ngAfterViewInit() {
        setTimeout(() => this.ganttComponent.scrollToDate(1627729997), 200);
    }

    barClick(event: GanttBarClickEvent) {
        this.thyNotify.info(
            'Event: barClick',
            `tu as cliqué
        [${event.item.title}]`
        );
    }

    lineClick(event: GanttLineClickEvent) {
        this.thyNotify.info(
            'Event: lineClick',
            `tu as cliqué
        ${event.source.title} arriver ${event.target.title} ligne associée
        `
        );
    }

    dragMoved(event: GanttDragEvent) {}

    dragEnded(event: GanttDragEvent) {
        this.thyNotify.info('Event: dragEnded', `édité [${event.item.title}] temps`);
        this.items = [...this.items];
    }

    selectedChange(event: GanttSelectedEvent) {
        event.current && this.ganttComponent.scrollToDate(event.current?.start);

        this.thyNotify.info(
            'Event: selectedChange',
            `actuellement sélectionné
            item de
            id pour ${(event.selectedValue as GanttItem[]).map((item) => item.id).join('、')}`
        );
    }

    linkDragEnded(event: GanttLinkDragEvent) {
        this.items = [...this.items];
        this.thyNotify.info(
            'Event: linkDragEnded',
            `Créé une association
        `
        );
    }

    print(name: string) {
        this.printService.print(name);
    }

    scrollToToday() {
        this.ganttComponent.scrollToToday();
    }

    switchChange() {
        if (this.isBaselineChecked) {
            this.baselineItems = [
                { id: '000000', start: 1627728888, end: 1628421197 },
                { id: '000001', start: 1617361997, end: 1625483597 },
                { id: '000002', start: 1610536397, end: 1610622797 },
                { id: '000003', start: 1628507597, end: 1633345997 },
                { id: '000004', start: 1624705997 }
            ];
        } else {
            this.baselineItems = [];
        }
    }

    selectView(type: GanttViewType) {
        this.viewType = type;
        this.selectedViewType = type;
    }

    viewChange(event: GanttView) {
        console.log(event.viewType);
        this.selectedViewType = event.viewType;
    }

    refresh() {
        this.loading = true;
        of(randomItems(30))
            .pipe(
                delay(2000),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((res) => {
                this.items = res;
            });
    }

    onDragDropped(event: GanttTableDragDroppedEvent) {
        const sourceItems = event.sourceParent?.children || this.items;
        sourceItems.splice(sourceItems.indexOf(event.source), 1);
        if (event.dropPosition === 'inside') {
            event.target.children = [...(event.target.children || []), event.source];
        } else {
            const targetItems = event.targetParent?.children || this.items;
            if (event.dropPosition === 'before') {
                targetItems.splice(targetItems.indexOf(event.target), 0, event.source);
            } else {
                targetItems.splice(targetItems.indexOf(event.target) + 1, 0, event.source);
            }
        }
        this.items = [...this.items];
    }

    onDragStarted(event: GanttTableDragStartedEvent) {
        console.log('Le glissement commence', event);
    }

    onDragEnded(event: GanttTableDragEndedEvent) {
        console.log('La traînée est terminée        ', event);
    }
}
