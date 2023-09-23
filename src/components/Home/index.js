import {Component} from 'react'

import Loader from 'react-loader-spinner'

import EachProject from '../EachProject'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {
    projectsData: [],
    category: categoriesList[0].id,
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getApiData()
  }

  onFailureButton = () => {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({apiStatus: apiConstants.progress})

    const {category} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projectsData: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  onLoaderContainer = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} color="#328af2" />
    </div>
  )

  onSuccessContainer = () => {
    const {projectsData} = this.state
    return (
      <ul className="unordered-list">
        {projectsData.map(eachItem => (
          <EachProject key={eachItem.id} eachContent={eachItem} />
        ))}
      </ul>
    )
  }

  onFailureContainer = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onFailureButton}
      >
        Retry
      </button>
    </div>
  )

  onRenderOneComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessContainer()
      case apiConstants.failure:
        return this.onFailureContainer()
      case apiConstants.progress:
        return this.onLoaderContainer()

      default:
        return null
    }
  }

  onChangeOption = event => {
    this.setState({category: event.target.value}, this.getApiData)
  }

  render() {
    const {category} = this.state
    return (
      <div className="home-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo-image"
          />
        </div>
        <div className="input-projects-container">
          <select
            className="select-ele"
            onChange={this.onChangeOption}
            value={category}
          >
            {categoriesList.map(eachItem => (
              <option value={eachItem.id}>{eachItem.displayText}</option>
            ))}
          </select>
          {this.onRenderOneComponent()}
        </div>
      </div>
    )
  }
}

export default Home
