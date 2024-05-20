module.exports = {
    mode: 'full',
    title: 'Timsoft Group',
    siteProjectName: 'example',
    outputDir: 'dist/site',
    logoUrl:
        'https://imgs.search.brave.com/31ju8Tf3ePe-eEODDuZhtJC6H29YqGJzJCHHcz5rzVs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly96ZW5w/cm9zcGVjdC1wcm9k/dWN0aW9uLnMzLmFt/YXpvbmF3cy5jb20v/dXBsb2Fkcy9waWN0/dXJlcy82NjE4ZjQ0/ZGM1NGQzZDAwMDEy/YjkwM2QvcGljdHVy/ZQ.jpeg',
    repoUrl: 'https://github.com/worktile/ngx-gantt',
    defaultLocale: 'zh-cn',
    navs: [
        null,
        {
            title: 'Composant',
            path: 'components',
            locales: {
                'en-us': {
                    title: 'Component'
                }
            }
        },
        {
            title: 'Paramètres',
            path: 'configuration',
            lib: 'ngx-gantt',
            locales: {
                'en-us': {
                    title: 'Configuration'
                }
            }
        },
         {
           title: 'GitHub',
            path: 'https://github.com/worktile/ngx-gantt',
             isExternal: true
         },
         {
           title: 'Journal des modifications ',
            path: 'https://github.com/worktile/ngx-gantt/blob/master/CHANGELOG.md',
            isExternal: true,
             locales: {
                'en-us': {
                    title: 'Changelog'
                }
            }
         }
    ],
    libs: [
        {
            name: 'ngx-gantt',
            rootDir: './example/src/app/configuration',
            exclude: [],
            categories: [
                {
                    id: 'config',
                    title: 'Configuration',
                    locales: {
                        'en-us': {
                            title: 'Configuration'
                        }
                    }
                }
            ]
        }
    ]
};
