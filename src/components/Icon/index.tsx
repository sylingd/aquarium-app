import classNames from 'classnames';
import { createElement } from 'rax';
import Text from 'rax-text';
import './iconfont.css';

interface IconProps {
  className?: string;
  name: string;
}

function Icon(props: IconProps) {
  const { className, name } = props;
  return <Text className={classNames('icon', 'iconfont', `icon-${name}`, className)} />;
}

export default Icon;
