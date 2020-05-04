import React from 'react'

export default function Error({flag}) {

    let message = '';

    switch(flag) {
        case 'wait':
            message = 'Waiting for the responce';
            break;
        case 'empty':
            message = 'There are no orders yet';
            break;
        case 'empty offers':
            message = 'There are no offers yet';
            break;
        case 'empty customers':
            message = 'There are no customers yet';
            break;
        default:
            message = 'There is no such a path';
    }

    return (
        <h2 className={'error'} align="center">{message}</h2>
    )
}
