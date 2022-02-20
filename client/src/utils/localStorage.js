export const getAddedFriendIds = () => {
    const addedFriendIds = localStorage.getItem('added_friends')
        ? JSON.parse(localStorage.getItem('added_friends'))
        : [];

    return addedFriendIds;
}

export const addFriendIds = (friendIdArr) => {
    if (friendIdArr.length) {
        localStorage.setItem('add_friends', JSON.stringify(friendIdArr));
    } else {
        localStorage.removeItem('add_friends');
    }
};

export const removeFriendId = (friendId) => {
    const addedFriendIds = localStorage.getItem('added_books')
        ? JSON.parse(localStorage.getItem('added_friends'))
        : null;

    if (!addedFriendIds) {
        return false;
    }

    const updatedAddedFriendIds = addedFriendIds?.filter((addedFriendId) => addedFriendId !== friendId);
    localStorage.setItem('added_friends', JSON.stringify(updatedAddedFriendIds));

    return true;
};