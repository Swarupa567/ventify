import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Select,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { confessCategories } from "../assets/data/data";
import color from "../styles/colors";
import { useRef, useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";

const CONFESSION_CHAR_LIMIT = 280;

const CreateConfess = (props) => {
  const { loggedInBatchYear } = useContext(VentifyContext);
  const {
    isCreateConfessOpen,
    createConfession,
    handleCategoryChange,
    handleIsVisibleToBatchOnlyChange,
    handleCommentIsDisabledChange,
    confession,
    setConfession,
    confessionCategory,
    isVisibleToBatchOnly,
    commentIsDisabled,
    isConfessing,
    resetConfession,
  } = props;
  const initialRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isCreateConfessOpen}
      onClose={resetConfession}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      size={{ base: "full", sm: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{loggedInBatchYear}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <Textarea
                placeholder="Write your confession here..."
                focusBorderColor={color.primary}
                variant="outline"
                size="md"
                rows="5"
                maxLength={CONFESSION_CHAR_LIMIT}
                resize="none"
                ref={initialRef}
                onChange={(e) => setConfession(e.target.value)}
                value={confession}
              />
              <FormHelperText>
                {confession.length}/{CONFESSION_CHAR_LIMIT}
              </FormHelperText>
            </FormControl>
          </Box>

          <Box marginTop="20px">
            <Select
              focusBorderColor={color.primary}
              variant="filled"
              textTransform="capitalize"
              onChange={handleCategoryChange}
              value={confessionCategory}
            >
              {confessCategories.map((item) => (
                <option value={item.title} key={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Box>

          <Box marginTop="20px">
            <FormControl>
              <FormLabel htmlFor="isVisibleToBatchOnly">
                Visible to your batch only
              </FormLabel>
              <Switch
                id="isVisibleToBatchOnly"
                colorScheme="purple"
                onChange={handleIsVisibleToBatchOnlyChange}
                isChecked={isVisibleToBatchOnly}
              />

              <FormLabel htmlFor="commentIsDisabled" marginTop="10px">
                Disable comments
              </FormLabel>
              <Switch
                id="commentIsDisabled"
                colorScheme="purple"
                onChange={handleCommentIsDisabledChange}
                isChecked={commentIsDisabled}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row">
            <Button
              colorScheme="red"
              variant="outline"
              textTransform="capitalize"
              onClick={resetConfession}
              mr={3}
            >
              Cancel
            </Button>

            <Button
              variant="solid"
              colorScheme="purple"
              textTransform="capitalize"
              onClick={createConfession}
              isDisabled={!confession}
              isLoading={isConfessing}
              loadingText="Confessing"
            >
              confess
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateConfess;
