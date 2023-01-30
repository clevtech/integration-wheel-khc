import {
  Badge,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Tooltip,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { IoCloseOutline, IoEyeOutline, IoReloadOutline } from 'react-icons/io5';

export default function HistoryTableRow(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id, providerRequestName, managerEmail, startDate, status, totalTime, response, actions } = props;

  return (
    <Tr>
      <Td>{providerRequestName}</Td>
      <Td>{managerEmail}</Td>
      <Td>{new Date(startDate + 'Z').toLocaleString('en-GB')}</Td>
      <Td>
        <Badge
          colorScheme={
            status === 'COMPLETED' ? 'brand.green' : status === 'PENDING' ? 'brand.yellow' : 'brand.red'
          }
        >
          {status}
        </Badge>
      </Td>
      <Td>{totalTime / 1000} с</Td>
      <Td>
        <HStack>
          <Tooltip label='Посмотреть результат' aria-label='Посмотреть результат'>
            <Button colorScheme='brand.green' onClick={onOpen}>
              <IoEyeOutline />
            </Button>
          </Tooltip>
          <Tooltip label='Повторить запрос' aria-label='Повторить запрос'>
            <Button
              colorScheme='brand.yellow'
              onClick={() => {
                actions.resend(id);
              }}
            >
              <IoReloadOutline />
            </Button>
          </Tooltip>
          <Tooltip label='Отменить запрос' aria-label='Повторить запрос'>
            <Button
              colorScheme='brand.red'
              disabled={status !== 'IN_PROGRESS' ? true : false}
              onClick={() => {
                actions.cancel(id);
              }}
            >
              <IoCloseOutline />
            </Button>
          </Tooltip>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxWidth='container.xl'>
            <ModalHeader>Результат запроса</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow='scroll'>
              <pre>
                {JSON.stringify(
                  JSON.parse(response.replace(/\\n/g, '').replace(/\\t/g, '').replace(/\\r/g, '')),
                  null,
                  2
                )}
              </pre>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='brand.red' mr={3} onClick={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}
