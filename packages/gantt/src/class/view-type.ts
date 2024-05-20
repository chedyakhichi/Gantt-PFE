export enum GanttViewType {
    day = 'day',
    quarter = 'quarter',
    month = 'month',
    year = 'year',
    week = 'week',
    hour = 'hour'
}

export const ganttViews = [
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
