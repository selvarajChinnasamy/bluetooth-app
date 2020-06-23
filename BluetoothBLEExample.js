import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BluetoothBLEExample = () => {
    const manager = new BleManager();
    const [currentState, setCurrentState] = useState();

    useEffect(() => {
        const subscription = manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                console.log('scan!');
                scanAndConnect();
                subscription.remove();
            }
        }, true);
    });

    const scanAndConnect = () => {
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('err', error);
                return
            }
            console.log('device', device);
        });
    }

    const enableDisable = () => {
        setCurrentState(!currentState);
        if (currentState) {
            manager.enable().then(res => {
                console.log('enable success');
            });
        } else {
            manager.disable().then(res => {
                console.log('disable success');
            });;
        }
    }

    return (
        <>
        <Text>BLE Example!</Text>
        <Button title="enable" onPress={() => enableDisable()}/>
        </>
    );
};

export default BluetoothBLEExample;