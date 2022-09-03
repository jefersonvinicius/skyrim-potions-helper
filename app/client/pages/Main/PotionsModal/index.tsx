import { getIngredientImage } from '@app/client/utils/ingredients';
import { Ingredient } from '@app/core/ingredient';
import { selectPotions } from '@app/core/select-potions';
import React, { useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import MiniIngredientCard from './MiniIngredientCard';
import { CloseButton, ModalContent } from './styles';
import { GrClose } from 'react-icons/gr';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
  },
};

type Props = {
  ingredients: Ingredient[];
  isVisible: boolean;
  onClose: () => void;
};

Modal.setAppElement('#root');

export default function PotionsModal({
  ingredients,
  isVisible,
  onClose,
}: Props) {
  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isVisible]);

  const potions = useMemo(() => {
    if (!isVisible) return [];
    return selectPotions({
      ingredients: ingredients.map((ingredient) => ingredient.name),
    });
  }, [ingredients, isVisible]);

  return (
    <Modal
      isOpen={isVisible}
      style={modalStyles}
      onRequestClose={onClose}
      preventScroll
    >
      <ModalContent>
        {potions.map((potion) => (
          <div key={potion.potion}>
            <h2>{potion.potion}</h2>
            <div className="ingredients-list">
              {potion.ingredients.map((ingredient) => (
                <MiniIngredientCard
                  key={ingredient}
                  ingredient={{
                    name: ingredient,
                    image: getIngredientImage(ingredient),
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        <CloseButton>
          <GrClose />
        </CloseButton>
      </ModalContent>
    </Modal>
  );
}
