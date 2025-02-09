import { selectorProps } from '../../global'
import { BambooHRConfig } from './websites/BambooHR/config'
import { GreenHouseConfig } from './websites/GreenHouse/config'
import { LeverConfig } from './websites/Lever/config'
import { WorkDayConfig } from './websites/WorkDay/config'
import { JobViteConfig } from './websites/JobVite/config'

export const AutoFillingWebsites: any = [
  WorkDayConfig,
  LeverConfig,
  GreenHouseConfig,
  JobViteConfig,
  BambooHRConfig,
]

export const filteredWebsite: any = AutoFillingWebsites.find((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    return selector
  }
})
