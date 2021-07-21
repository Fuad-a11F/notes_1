export default function alert_t(id, callback) {
    if (window.confirm('Вы действительно хотите удалить?')) callback(id)
}