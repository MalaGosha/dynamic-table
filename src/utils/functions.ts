export const displayError = (message: string, error: string) => {
    console.log(message, error)
}

export const getRowColor = (rowIndex: number, selectedRows: number[]) => {
    const baseColor = 'rgb(211, 215, 220)'; // #D3D7DC - light grey
    const highlightColor = 'rgb(242, 246, 252)'; // #F2F6FC - lighter light grey
    if (selectedRows.includes(rowIndex)) {
        return highlightColor;
    } else {
        return baseColor;
    }
};

export const handleClickToLink = (url: string) => {
    const newTab = window.open(url, '_blank');
    newTab?.focus();
}