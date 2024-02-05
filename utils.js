const date = (dia, mes, anno, hora = '00:00') => {
    const _fecha = new Date(anno, mes - 1, dia)
    const [horas, minutos] = hora.split(':')
    _fecha.setHours(horas, minutos, 0, 0)
    return _fecha
    date
}

module.exports={
    date
}