import ActionButton from '@/components/ActionButton';
import Card from '@/components/Card';
import { createElement } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import './index.less';

export default function Home() {
  return (
    <View className="page-home">
      <View className="top-section">
        <Text className="title">温度</Text>
        <View className="main">
          <Text className="text">30</Text>
          <Text className="unit">℃</Text>
        </View>
      </View>
      <View className="top-section">
        <Text className="title">pH 值</Text>
        <View className="main">
          <Text className="text">7</Text>
          <Text className="unit">中性</Text>
        </View>
      </View>
      <View className="line">
        <Card>
          <ActionButton align="ver" icon="touwei" text="投喂" />
        </Card>
        <Card>
          <ActionButton align="ver" icon="huanshui" text="换水" />
        </Card>
      </View>
    </View>
  );
}
