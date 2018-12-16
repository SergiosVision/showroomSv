const PageType = {
    Dashboard: '/dashboard',
    Works: '/dashboard/works',
    News: '/dashboard/news',
    About: '/dashboard/about',
    Contacts: '/dashboard/contacts'
}

export const toPageName = type => {
    switch (type) {
        case PageType.Dashboard:
            return 'Dashboard'
        case PageType.Works:
            return 'Works'
        case PageType.News:
            return 'News'
        case PageType.About:
            return 'About'
        case PageType.Contacts:
            return 'Contacts'
        default:
            return 'Unknown'
    }
}