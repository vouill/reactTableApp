import moment from 'moment'

export const getFilteredEvents = (eventTable, filter) => {
    let filteredEvents = eventTable.events
    if (filter.start) {
        const start = moment(filter.start)
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = moment(event.created_at)
            return eventDate.isAfter(start)
        })
    }
    if (filter.end) {
        // Add one day to make the filter day inclusive
        const end = moment(filter.end).add(1, 'days');
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = moment(event.created_at)
            return eventDate.isBefore(end)
        })
    }
    return { ...eventTable, events: filteredEvents }
}

export const getCommitSearchResult = (events) => {
    let arr = events
    let commitArray = []
    arr = arr.filter(event => {
        return event.type === 'PushEvent'
    })
    arr.forEach(event => {
        event.payload.commits.forEach(commit => {
            commitArray.push({
                repo: event.repo,
                author: commit.author,
                message: commit.message,
                url: commit.url,
                sha: commit.sha
            })
        })
    })
    return commitArray
}