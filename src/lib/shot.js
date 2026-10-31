// Automatic preview image for a live link (used when a project has no uploaded screenshot)
export const shot = (u) => (u ? `https://image.thum.io/get/width/1200/crop/750/${u}` : '');
