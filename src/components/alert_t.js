export default function alert_t(id, callback) {
    if (confirm('Вы действительно хотите удалить?')) callback(id)
}