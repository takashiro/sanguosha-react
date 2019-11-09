export default function Play() {
	const locker = this.lock();
	this.reply(locker);
}
