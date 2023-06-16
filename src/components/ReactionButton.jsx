import { Tooltip, Button } from "@chakra-ui/react";
import color from "../styles/colors";

const ReactionButton = (props) => {
  const { title, icon, reactToConfession, reactionCount } = props;
  return (
    <Tooltip
      hasArrow
      label={title}
      colorScheme="purple"
      fontSize="sm"
      placement="top"
      textTransform="capitalize"
      bg={color.primary}
      color="#fff"
    >
      <Button
        rightIcon={icon}
        variant="ghost"
        aria-label={title}
        size="md"
        onClick={() => reactToConfession(title)}
        colorScheme="blackAlpha"
        _hover={{
          color: color.primary,
        }}
      >
        {reactionCount}
      </Button>
    </Tooltip>
  );
};

export default ReactionButton;
