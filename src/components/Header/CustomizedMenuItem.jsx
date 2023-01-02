import { useState } from 'react';

import { MenuItem, Text } from '@chakra-ui/react';

export default function CustomizedMenuItem({ language, onClick }) {
    const [menuItemColor, setMenuItemColor] = useState('black');

    return (
        <MenuItem
            value={language}
            color={menuItemColor}
            _hover={{ background: 'brand.hover.yellow' }}
            _expanded={{ background: 'brand.hover.yellow' }}
            _focus={{ background: 'brand.hover.yellow' }}
            onClick={(e) => onClick(e.target.value)}
            onMouseEnter={() => setMenuItemColor('white')}
            onMouseLeave={() => setMenuItemColor('black')}
        >
            <Text>{language}</Text>
        </MenuItem>
    );
}
