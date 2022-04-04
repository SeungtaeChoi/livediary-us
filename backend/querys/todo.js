const select = (userInfo) => {

    let sql = `
        select
        *
        from user
        where 1=1
    `;
    if(Object.keys(userInfo).includes('userId')){ sql += ` and id = '${userInfo.userId}'`; }
    if(Object.keys(userInfo).includes('userPassword')){ sql += ` and password = '${userInfo.userPassword}'`; }
    sql += `;`;
    return sql;
}

const insert = (todoInfo) => {
    let sql = `
        insert into todo (
            user_id, 
            id, 
            title, 
            date, 
            time, 
            during, 
            checked, 
            state,
            time_fix,
            insert_id,
            update_id
        ) values (
            '${todoInfo.user_id}',
            '${todoInfo.id}',
            '${todoInfo.title}',
            '${todoInfo.date}',
            '${todoInfo.time}',
            '${todoInfo.during}',
            '${todoInfo.checked?1:0}',
            '${todoInfo.state}',
            '${todoInfo.time_fix?1:0}',
            '${todoInfo.request_id}',
            '${todoInfo.request_id}'
        )
    `;
    sql += `;`;
    return sql;
}


module.exports = { select, insert };