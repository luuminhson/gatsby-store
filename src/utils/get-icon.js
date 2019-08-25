// @flow

const getIcon = (name: string) => {
  let icon;

  switch (name) {
    case 'facebook':
      icon = 'oi-icon-facebook';
      break;
    case 'instagram':
      icon = 'oi-icon-instagram';
      break;
    case 'phone':
      icon = 'oi-icon-phone-call';
      break;
    case 'email':
      icon = 'oi-icon-email';
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
