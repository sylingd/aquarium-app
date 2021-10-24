import ActionButton from '@/components/ActionButton';
import Card from '@/components/Card';
import { api } from '@/utils/api';
import alert from '@uni/alert';
import { createElement, useEffect, useState } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import './index.less';

export default function Home() {
  const [status, setStatus] = useState({
    status: 'offline',
    ph: '--',
    temperature: '--',
    phText: getPhText('7'),
  });

  useEffect(() => {
    (async () => {
      const newStatus = await api('device/get?id=7afb16b8809ddb4de8049f66eed09a2a');
      setStatus({
        ...newStatus,
        phText: getPhText(newStatus.ph),
      });
      if (newStatus.status === 'offline') {
        alert({
          content: '设备离线',
        });
      }
    })();
  }, []);

  return (
    <View className="page-home">
      <View className="top-section">
        <Text className="title">温度</Text>
        <View className="main">
          <Text className="text">{status.temperature}</Text>
          <Text className="unit">℃</Text>
        </View>
      </View>
      <View className="top-section">
        <Text className="title">pH 值</Text>
        <View className="main">
          <Text className="text">{status.ph}</Text>
          <Text className="unit">{status.phText}</Text>
        </View>
      </View>
      <View className="line">
        <Card>
          <ActionButton align="hoz" icon="touwei" text="投喂" />
        </Card>
        <Card>
          <ActionButton align="hoz" icon="huanshui" text="换水" />
        </Card>
      </View>
    </View>
  );
}
