import { selectorProps } from '../../global'
import { GreenHouseConfig } from './websites/GreenHouse/config'
import { LeverConfig } from './websites/Lever/config'
import { WorkDayConfig } from './websites/WorkDay/config'
import { iCIMSConfig } from './websites/iCIMS/config'

export const AutoFillingWebsites: any = [WorkDayConfig, LeverConfig, GreenHouseConfig, iCIMSConfig]

export const filteredWebsite: any = AutoFillingWebsites.find((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    return selector
  }
})
