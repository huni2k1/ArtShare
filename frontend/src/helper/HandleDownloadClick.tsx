export const handleDownloadClick = (imgURL: string) => {
    const link = document.createElement('a');
    link.href = imgURL;
    link.download = 'artwork.png';
    link.click();
  }
