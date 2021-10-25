import Icon from '@/components/Icon';
import { createElement, FC } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';

interface TipProps {
  message: string;
}

const Tip: FC<TipProps> = (props) => {
  const { message } = props;

  return (
    <View className="tip">
      <Icon name="tishi" />
      <Text className="text">{message}</Text>
    </View>
  );
};

export default Tip;
