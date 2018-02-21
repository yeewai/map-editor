export const showModal = (modalType, props) => ({
    type: 'modal/SHOW',
  	modalType: modalType,
  	modalProps: props
});

export const hideModal = (modalType) => ({
	type: 'modal/HIDE',
    modalType
});
