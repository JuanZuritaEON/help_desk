import React from 'react'
import { Results, Sidebar, SpecialComponent } from '../Components'
import { BodyData } from '../Redux'

const BodyContainer = (props: BodyData) => {
  const { actualTab, userData: { name, numOtor, userId }, sectionTabs, actualDate, sectionLoader } = props
  const [resultTabs, setResultTabs] = React.useState(sectionTabs.length > 1 ? sectionTabs : [])
  const [currentTab, setCurrentTab] = React.useState('')
  
  const handleChangeTab = (name: string) => {
    setResultTabs((prev: any) =>  (
      prev.map(
        (tab: any) => tab.name === name ? {...tab, active: true} : {...tab, active: false}
      )
    )
  )
  }

  React.useEffect(() => {
    if (resultTabs.length) setCurrentTab(resultTabs.filter((tab: any) => tab.active)[0].name)
  }, [resultTabs])

  return (
    <>
      <Sidebar
        actualTab={actualTab}
        nameUser={name}
        date={actualDate.toLocaleDateString('es-MX', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />
      <Results
        actualTab={actualTab}
        changeSectionTab={handleChangeTab}
        sectionsTabs={resultTabs}
        sectionLoader={sectionLoader}
        component={<SpecialComponent actualDate={actualDate} currentTab={currentTab} userData={{ name, numOtor, userId }} />}
      />
    </>
  )
}

export default BodyContainer