import { toast } from 'react-toastify'

import { IToasterFeedback } from 'interfaces/components/ToasterFeedback'

export const useToasterFeedback = ({ msg, type }: IToasterFeedback) => {
  console.log('useToasterFeedback ', type)

  if (type === 'success') {
    toast.success(msg)
  } else if (type === 'error') {
    toast.error(msg)
  } else if (type === 'warn') {
    toast.warn(msg)
  } else {
    toast.info(msg)
  }
}
