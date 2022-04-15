import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface Props {
  name: string;
}

const SocialItem = ({ name }: Props) => {
  switch (name.toLowerCase()) {
    case 'youtube':
      return <FaYoutube className="w-10" />;
    case 'facebook':
      return <FaFacebook className="w-10" />;
    case 'instagram':
      return <FaInstagram className="w-10" />;
    default:
      return <FaLinkedin className="w-10" />;
  }
};

export default SocialItem;
