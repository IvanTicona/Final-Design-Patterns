import React from 'react';
import { Image } from 'react-native';

interface ProfileImageProps {
  uri: string;
  style?: object;
}

const ProfileImage = ({ uri, style }: ProfileImageProps) => {
  return (
    <Image source={{ uri }} style={style} />
  );
};

export default ProfileImage;
