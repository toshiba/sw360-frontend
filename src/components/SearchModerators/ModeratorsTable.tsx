import { memo } from "react"
import { Table } from "../sw360"


interface Props {
    data: any,
    columns: any
}


const compare = (preState: any, nextState: any) => {

    return (preState.data === nextState.data)

}
  
const ModeratorsTable  = memo(function VulnerTable({columns, data}: Props) {
  
    return <Table columns={columns} data={data}/>
  
  }, compare)

export default ModeratorsTable;