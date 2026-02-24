import React from 'react'
import { ResultsData } from '../../Redux'
import Loader from '../Loader/Loader'
import './Results.css'

const Results: React.FunctionComponent<ResultsData> = (props) => {
  const { actualTab, sectionsTabs, changeSectionTab, component, sectionLoader } = props


  return (
    <article className='resultsContent'>
      <h2>{actualTab}</h2>
      {sectionsTabs.length > 0 && 
        <div className='sectionTabCont'>
          {
            sectionsTabs.map((tab: any) => (
              <button
                key={`section_tab_${tab.name}`}
                type="button"
                className={`sectionTabSeparator ${tab.active && 'sectionTabActive'}`}
                onClick={() => sectionLoader ? null : changeSectionTab(tab.name)} >
                  {tab.name}
                  {tab.icon}
              </button>
            ))
          }
        </div>
      }
      {
        sectionLoader ? <Loader wrapperClass='generalLoader' /> : (
        <section>
          {component}
        </section>
        )
      }
    </article>
  )
}

export default Results