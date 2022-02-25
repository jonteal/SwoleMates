export const getAddedUserIds = () => {
    const addedUserIds = localStorage.getItem('added_users')
        ? JSON.parse(localStorage.getItem('added_users'))
        : [];

    return addedUserIds;
}

export const addUserId = (userIdArr) => {
    if (userIdArr.length) {
        localStorage.setItem('add_users', JSON.stringify(userIdArr));
    } else {
        localStorage.removeItem('add_users');
    }
};

export const removeUserId = (userId) => {
    const addedUserIds = localStorage.getItem('added_users')
        ? JSON.parse(localStorage.getItem('added_users'))
        : null;

    if (!addedUserIds) {
        return false;
    }

    const updatedAddedUserIds = addedUserIds?.filter((addedUserId) => addedUserId !== userId);
    localStorage.setItem('added_users', JSON.stringify(updatedAddedUserIds));

    return true;
};