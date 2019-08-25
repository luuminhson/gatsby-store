// @flow
const getContactHref = (name: string, contact: string) => {
    let href;
  
    switch (name) {
      case 'facebook':
        href = `https://www.facebook.com/${contact}`;
        break;
      case 'phone':
        href = `tel:${contact}`;
        break;
      case 'instagram':
        href = `https://www.instagram.com/${contact}`;
        break;`https://www.linkedin.com/in/${contact}`;
        break;
      case 'email':
        href = `mailto:${contact}`;
        break;
      default:
        href = contact;
        break;
    }
  
    return href;
  };
  
  export default getContactHref;
  