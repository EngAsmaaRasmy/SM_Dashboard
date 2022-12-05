const allItems = [{
        _name: 'CSidebarNavItem',
        name: 'لوحة التحكم',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {}
    },
    {
        _name: 'CSidebarNavItem',
        name: 'مٌقدمي الخدمات',
        to: '/service-providers',
        icon: 'cil-people',
        badge: {}

    },
    {
        _name: 'CSidebarNavItem',
        name: 'الخدمات',
        to: '/services',
        icon: 'cil-chartPie',
        badge: {}
    },
    {
        _name: 'CSidebarNavItem',
        name: 'الحسابات',
        to: '/accounts',
        icon: 'cil-calculator',
        badge: {}
    },
    {
        _name: 'CSidebarNavItem',
        name: 'الفواتير',
        to: '/invoices',
        icon: 'cil-calculator',
        badge: {}
    },
    {
        _name: 'CSidebarNavDropdown',
        name: 'التقارير',
        icon: 'cil-list',
        items: [{
                _name: 'CSidebarNavItem',
                name: " التحويلات إلي الخزنة ",
                to: '/reports/to-safe'
            },
            {
                _name: 'CSidebarNavItem',
                name: " التحويلات من الخزنة ",
                to: '/reports/from-safe'
            },
            {
                _name: 'CSidebarNavItem',
                name: " التحويلات إلي البنك ",
                to: '/reports/to-bank'
            },
            {
                _name: 'CSidebarNavItem',
                name: " التحويلات من البنك ",
                to: '/reports/from-bank'
            },
            {
                _name: 'CSidebarNavItem',
                name: ' الدائنون والمبالغ المستحقة ',
                to: '/reports/creditors-report',
            },
            {
                _name: 'CSidebarNavItem',
                name: '   أرباح مٌقدمي الخدمات ',
                to: '/reports/provider-profits-report',
            },
        ]
    },

]

let userSidebar = []

if (localStorage.token) {
    userSidebar = allItems
} else {
    userSidebar = allItems
}

export default [{
    _name: 'CSidebarNav',
    _children: userSidebar
}]