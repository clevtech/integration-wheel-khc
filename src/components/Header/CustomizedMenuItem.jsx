import { useState } from 'react';

import { MenuItem, Text } from '@chakra-ui/react';

export default function CustomizedMenuItem({ language, onClick }) {
    const [menuItemColor, setMenuItemColor] = useState('black');

    return (
        <MenuItem
            value={language}
            color={menuItemColor}
            _hover={{ background: 'yellowKhc.200' }}
            _expanded={{ background: 'yellowKhc.200' }}
            _focus={{ background: 'yellowKhc.200' }}
            onClick={(e) => onClick(e.target.value)}
            onMouseEnter={() => setMenuItemColor('white')}
            onMouseLeave={() => setMenuItemColor('black')}
        >
            <Text as='b'>{language}</Text>
        </MenuItem>
    );
}
