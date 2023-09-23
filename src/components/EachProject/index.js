import './index.css'

const EachProject = props => {
  const {eachContent} = props
  return (
    <li className="each-list-item">
      <img
        src={eachContent.imageUrl}
        alt={eachContent.name}
        className="each-image"
      />
      <p className="each-name">{eachContent.name}</p>
    </li>
  )
}

export default EachProject
