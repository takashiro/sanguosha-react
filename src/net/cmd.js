
const net = {
	// Common commands
	Invalid : 0x0,

	CheckVersion: 0x1,

	Login: 0x2,
	Logout: 0x3,

	CreateRoom: 0x4,
	EnterRoom: 0x5,
	LeaveRoom: 0x6,
	UpdateRoom: 0x7,

	SetUserList: 0x8,
	AddUser: 0x9,
	RemoveUser: 0xA,

	Speak: 0xB,
	LoadGame: 0xC,

	// Sanguosha Commands
};

export default net;
