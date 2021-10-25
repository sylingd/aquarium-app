import ActionButton from '@/components/ActionButton';
import Card from '@/components/Card';
import { api } from '@/utils/api';
import { sendCommand } from '@/utils/command';
import { getPhText, getPhType, getTempType } from '@/utils/envCheck';
import { showToast } from '@uni/toast';
import classNames from 'classnames';
import { createElement, useCallback, useEffect, useState } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Tip from './tip';
import './index.less';

const DEVICE_ID = '7afb16b8809ddb4de8049f66eed09a2a';

export default function Home() {
  const [status, setStatus] = useState({
    status: 'offline',
    ph: '--',
    temperature: '--',
    temperatureType: getTempType('24'),
    phText: getPhText('7'),
    phType: getPhType('7'),
  });

  useEffect(() => {
    let timer: any = null;
    let lastStatus = '';

    async function check() {
      const newStatus = await api(`device/get?id=${DEVICE_ID}`);
      setStatus({
        ...newStatus,
        phText: getPhText(newStatus.ph),
        phType: getPhType(newStatus.ph),
        temperatureType: getTempType(newStatus.temperatureType),
      });
      if (newStatus.status !== lastStatus && newStatus.status === 'offline') {
        showToast('设备离线');
      }
      lastStatus = newStatus.status;
      timer = setTimeout(check, 2000);
    }

    check();

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, []);

  const handleFeed = useCallback(
    () =>
      sendCommand('喂食', {
        id: DEVICE_ID,
        command: 'feed',
      }),
    [],
  );

  const handleReload = useCallback(
    () =>
      sendCommand('换水', {
        id: DEVICE_ID,
        command: 'reload',
      }),
    [],
  );

  return (
    <View
      className={classNames('page-home', {
        'status-warn': status.phType !== 'normal' || status.temperatureType !== 'normal',
        'status-offline': status.status === 'offline',
      })}
    >
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
      {status.phType === 'alkalinity' && <Tip message="当前水质为碱性" />}
      {status.phType === 'acidity' && <Tip message="当前水质为酸性" />}
      {status.temperatureType === 'hot' && <Tip message="当前水温偏高" />}
      {status.temperatureType === 'cold' && <Tip message="当前水温偏低" />}
      <View className="line">
        <Card>
          <ActionButton align="hoz" icon="touwei" text="投喂" onClick={handleFeed} />
        </Card>
        <Card>
          <ActionButton align="hoz" icon="huanshui" text="换水" onClick={handleReload} />
        </Card>
      </View>
    </View>
  );
}
