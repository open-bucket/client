export const getSelectedConsumer = (state) => state.consumer.consumers.find(consumer =>
  consumer.id === Number(state.consumerContent.selectedConsumerId));


export const getSelectedProducer = (state) => state.producer.producers.find(producer =>
  producer.id === Number(state.producerContent.selectedProducerId));
