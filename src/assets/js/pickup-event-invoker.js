export function sendNsCmd(eventName, appNo) {
	sendNSCommand('executeEvent', 'Navigate' + eventName, 'PickupAppNo', appNo);
}
