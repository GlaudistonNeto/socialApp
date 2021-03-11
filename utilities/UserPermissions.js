import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
  getCameraPermission = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (ststus != 'granted') {
        alert('We need Permissions to use your media library');
      };
    };
  };
};

export default new UserPermissions();
