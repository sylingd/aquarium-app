import { createElement } from 'rax';
import View from 'rax-view';
import './index.less';

function Card(props: any) {
  const { children } = props;
  return <View className="card">{children}</View>;
}

export default Card;
