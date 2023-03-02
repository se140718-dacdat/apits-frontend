import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SkillItems.css"


export const ItemPlus = (props:any) => {
    const {name} = props;
    return ( 
        <button className="btn-item">
            <FontAwesomeIcon icon={faPlus} />
            <span>{name}</span>
        </button>
     );
}

export const DepItems = () => {
    return ( 
        <div className="btn-items">
            <ItemPlus name='JavaScript'/>
            <ItemPlus name='CSS'/>
            <ItemPlus name='PhP'/>
            <ItemPlus name='React'/>
            <ItemPlus name='HTML'/>
            <ItemPlus name='Node.js'/>
            <ItemPlus name='IOS'/>
            <ItemPlus name='MySQL'/>
            <ItemPlus name='Python'/>
            <ItemPlus name='C++'/>
        </div>
     );
}

export const Tester = () => {
    return ( 
        <div className="btn-items">
            <ItemPlus name='Test Plan'/>
            <ItemPlus name='Test Auto'/>
            <ItemPlus name='SDLC'/>
            <ItemPlus name='Agile'/>
            <ItemPlus name='Test web'/>
            <ItemPlus name='Mobile Test'/>
            <ItemPlus name='Database or SQL'/>
            <ItemPlus name='Logic Test'/>
            
        </div>
     );
}

export const DepOps = () => {
    return ( 
        <div className="btn-items">
            <ItemPlus name='AWS'/>
            <ItemPlus name='Kubernetes'/>
            <ItemPlus name='Python'/>
            <ItemPlus name='DevOps'/>
            <ItemPlus name='Docker'/>
            <ItemPlus name='CI'/>
            <ItemPlus name='CD'/>
            <ItemPlus name='Jenkins'/>
            <ItemPlus name='AWS EC2'/>
            <ItemPlus name='Ansible'/>
        </div>
     );
}
 