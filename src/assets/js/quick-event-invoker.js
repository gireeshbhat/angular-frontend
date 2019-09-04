export function sendNsCmd(eventName, varName, appNo) {
	sendNSCommand('executeEvent', eventName, varName, appNo);
}
