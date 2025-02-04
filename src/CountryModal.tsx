import * as React from 'react'
import { ModalProps, SafeAreaView, StyleSheet, Platform, ViewStyle } from 'react-native'
import { AnimatedModal } from './AnimatedModal'
import { Modal } from './Modal'
import { useTheme } from './CountryTheme'
import { CountryModalContext } from './CountryModalProvider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const CountryModal = ({
  children,
  withModal,
  disableNativeModal,
  modalStyle,
  ...props
}: ModalProps & {
  children: React.ReactNode
  withModal?: boolean
  disableNativeModal?: boolean
  modalStyle?: ViewStyle
}) => {
  const { backgroundColor } = useTheme()
  const { teleport } = React.useContext(CountryModalContext)
  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }, modalStyle]}>
      {children}
    </SafeAreaView>
  )
  React.useEffect(() => {
    if (disableNativeModal) {
      teleport!(<AnimatedModal {...props}>{content}</AnimatedModal>)
    }
  }, [disableNativeModal])
  if (withModal) {
    if (Platform.OS === 'web') {
      return <Modal {...props}>{content}</Modal>
    }
    if (disableNativeModal) {
      return null
    }
    return <Modal {...props}>{content}</Modal>
  }
  return content
}

CountryModal.defaultProps = {
  animationType: 'slide',
  withModal: true,
  disableNativeModal: false,
}
