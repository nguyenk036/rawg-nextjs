import { Button, Modal, Text } from "@nextui-org/react";
import { Game } from "../types";

interface GameProps {
  game: Game | null;
  open: boolean;
  handleOpen: (visible: boolean) => void;
}

const GameModal: React.FC<GameProps> = (props) => {
  const { game, open, handleOpen } = props;

  return (
    <Modal
      open={open}
      onClose={() => handleOpen(false)}
      width="700px"
      scroll
      blur
    >
      <Modal.Header>
        <Text>{game?.name}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>{game?.released}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onPress={() => handleOpen(false)} color="error">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameModal;
