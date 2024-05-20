import { Component, OnInit } from '@angular/core';
import { DocItem } from '@docgeni/template';

@Component({
    selector: 'app-example-components',
    templateUrl: './components.component.html'
})
export class AppExampleComponentsComponent implements OnInit {
    menus: DocItem[] = [
        {
            id: 'basic',
            title: 'Utilisation de base            ',

            path: 'basic'
        },
        {
            id: 'groups',
            title: 'Affichage groupé ',
            path: 'groups'
        },
        {
            id: 'virtual-scroll',
            title: 'défilement virtuel            ',

            path: 'virtual-scroll'
        },
        {
            id: 'custom-view',
            title: 'Vue personnalisée            ',

            path: 'custom-view'
        },
        {
            id: 'advanced',
            title: 'Utilisation avancée            ',

            path: 'advanced'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
