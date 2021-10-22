import classNames from 'classnames';
import { createElement, FC } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Icon from '../Icon';
import './index.less';

interface ActionButtonProps {
  icon: string;
  text: string;
  align?: 'ver' | 'hoz';
  active?: boolean;
  onClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = (props) => {
  const { icon, text, active, align = 'ver', onClick } = props;

  return (
    <View
      className={classNames('action-button', `action-button--${align}`, {
        'action-button--active': active,
      })}
      onClick={onClick}
    >
      <Icon name={icon} />
      <Text className="text">{text}</Text>
    </View>
  );
};

export default ActionButton;
