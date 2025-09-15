// convert date to a more readable format: like Jan 2023

export function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`
}

// convert date to a more readable format with time: like 2 seconds ago, 5 minutes ago, etc.
export function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'just now'; 
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    if (seconds < 2592000) {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
    if (seconds < 31536000) {
        const months = Math.floor(seconds / 2592000);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }
    const years = Math.floor(seconds / 31536000);
    return `${years} year${years === 1 ? '' : 's'} ago`
  
}

// Comments label to each post
export function formatComments(count) {
    if (count === 0) return ''
    if (count === 1) return `${count} `;
    if (count < 1000) return `${count}`;
    return `${Math.floor(count / 1000)}k`
}

// Like label to each post
export function formatLikes(count) {
    if (count === 0) return ''
    if (count === 1) return `${count} `;
    if (count < 1000) return `${count} `;
    return `${Math.floor(count / 1000)}k`
}

//Label for followersCount
export function formatFollowersCount(count) {
    if (count === 0) return '';
    if (count === 1) return `${count}`;
    if (count < 1000) return `${count}`;
    if (count < 1000000) return `${Math.floor(count / 1000)}k`;
    return `${Math.floor(count / 1000000)}M`;
}

//Label for followingCount
export function formatFollowingCount(count) {
    if (count === 0) return '';
    if (count === 1) return `${count}`;
    if (count < 1000) return `${count}`;
    if (count < 1000000) return `${Math.floor(count / 1000)}k`;
    return `${Math.floor(count / 1000000)}M`;
}

//Label for voteCount
export function formatVoteCount(count) {
    if (count === 0) return 'entry';
    if (count === 1) return `${count} entry`;
    if (count < 99) return `${count} entries`;
    if (count < 100) return '99+ entries';
}