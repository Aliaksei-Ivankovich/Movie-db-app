import { Skeleton } from 'antd';

import './skeletonList.scss';

const SkeletonList = (props) => {
    const {count} = props
    const arr = []

    for (let i = 0; i < count; i++) {
        let listItem = <li key={i} className='skeleton__item'>
                            <Skeleton.Image active 
                                            size='large'/>
                            <Skeleton active
                                    paragraph={{
                                    rows: 8,
                                    }}/>
                        </li>
        arr.push(listItem)
    }

    return (
        <ul className='skeleton__grid'>
            {arr}
        </ul>
    )
}

export default SkeletonList;